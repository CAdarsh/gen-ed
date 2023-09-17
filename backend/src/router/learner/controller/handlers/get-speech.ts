import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.ts';
import textToSpeech from '@google-cloud/text-to-speech';

import util from 'util';
import fs from 'fs';

import { logger } from '../../../../services/logger.ts';

const handler = async (req: Request, res: Response) => {

  const { text } = req.body;
  const client = new textToSpeech.TextToSpeechClient();

  try {
    // Construct the request
    const request = {
      input: { text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      // select the type of audio encoding
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    // @ts-ignore
    const [response] = await client.synthesizeSpeech(request);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');

    const audio = fs.readFileSync('output.mp3');
    console.log('Audio content read from file:', audio);

    res.status(StatusCodes.OK).send(audio);

  } catch (error) {
    logger.error(error);
    throw new BadRequestError('Something went wrong while generating the audio');
  }

};


export {
  handler as getSpeechHandler,
}