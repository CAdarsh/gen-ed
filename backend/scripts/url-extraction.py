import requests
from bs4 import BeautifulSoup
import csv
from urllib.parse import urlparse, urljoin

base_urls = [
    "https://healthcare.procon.org/history-of-the-right-to-health-care",
    "https://healthcare.procon.org/should-all-americans-have-the-right-be-entitled-to-health-care-pro-con-quotes",
    "https://www.procon.org/headlines/should-student-loan-debt-be-easier-to-discharge-in-bankruptcy-top-3-pros-cons",
    "https://www.procon.org/headlines/sanctuary-cities-top-3-pros-and-cons",
    "https://www.fairus.org/issue/illegal-immigration/whats-wrong-illegal-immigration",
    "https://publish.illinois.edu/kmw4/the-problem-with-sanctuary-cities",
    "https://freedomandcitizenship.columbia.edu/living-in-fear#:~:text=Sanctuary%20cities%20are%20important%20because,important%20American%20value%20is%20freedom.",
    "https://www.crfb.org/blogs/canceling-student-loan-debt-poor-economic-stimulus",
    "https://files.eric.ed.gov/fulltext/ED610484.pdf",
    "https://www.jhunewsletter.com/article/2011/04/why-universal-health-care-is-a-universally-terrible-idea-81427",
    "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2137072"
]

for base_url in base_urls:
    # Initialize the set of visited URLs and add the base URL
    visited_urls = set()
    visited_urls.add(base_url)

    # Initialize the set of URLs to be visited and add the base URL
    urls_to_visit = set()
    urls_to_visit.add(base_url)

    # Parse the base URL to get the domain name
    base_domain = urlparse(base_url).netloc

    # Initialize the CSV writer
    csv_file = open('links-' + base_url.split("/")[-1] +'.csv', 'w', newline='')
    csv_writer = csv.writer(csv_file)
    i = 0
    # Loop through the URLs to be visited
    while urls_to_visit and i < 10:
        i += 1
        # Get the next URL from the set of URLs to be visited
        current_url = urls_to_visit.pop()

        try:
            # Make a GET request to the URL
            response = requests.get(current_url)

            # Check if the response was successful (status code 200)
            if response.status_code == 200:

                # Parse the HTML content of the page
                soup = BeautifulSoup(response.content, 'html.parser')

                # Find all the links on the page
                for link in soup.find_all('a'):

                    # Get the URL from the link
                    link_url = link.get('href')

                    # Make sure the link URL is not None and is not an empty string
                    if link_url is not None and link_url != '':
                        print(link_url)
                        # Normalize the link URL by joining it with the base URL
                        link_url = urljoin(current_url, link_url)

                        # Parse the domain name from the link URL
                        link_domain = urlparse(link_url).netloc

                        # Check if the link domain matches the base domain
                        if link_domain == base_domain:

                            # Add the link URL to the set of URLs to be visited if it hasn't been visited yet
                            if link_url not in visited_urls:
                                urls_to_visit.add(link_url)

                            # Add the link URL to the set of visited URLs
                            visited_urls.add(link_url)

                            # Write the link URL to the CSV file
                            csv_writer.writerow([link_url])

            # Print an error message if the response was not successful
            else:
                print('Error: ' + str(response.status_code))

        # Print an error message if there was an error making the GET request
        except requests.exceptions.RequestException as e:
            print('Error: ' + str(e))

    # Close the CSV file
    csv_file.close()
