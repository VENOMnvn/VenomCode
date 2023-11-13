import OpenAI from 'openai';

const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

export default openai;