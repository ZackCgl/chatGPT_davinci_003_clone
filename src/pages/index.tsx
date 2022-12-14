import { type NextPage } from "next";
import Head from "next/head";
import { Configuration, OpenAIApi } from"openai"
import { useEffect, useState } from "react";
import Image from "next/image";

const Home: NextPage = () => {
  
  const [newResponse, setNewResponse] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(true)
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  const getResponse = async () =>{
    if(!newResponse) return new Error("No input found");
   
    const response:any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: newResponse,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response);
  }

  useEffect(() =>{
    if(newResponse){
      setDisabled(false)
    }
    else{
      setDisabled(true)
    }
  })
  return (
    <>
      <Head>
        <title>ChatGPT API For Translation and cheatsheets</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container flex flex-col gap-12 px-4 py-16 ">
          <div className="text-white flex">
            <Image className="shadow-lg shadow-slate-500" src="https://i.imgur.com/r9MH8zN.jpg" alt="" 
            height={100} width={100} />
            <h1 className="mt-20 ml-4 font-bold">ChatGPT API For Translation and cheatsheets</h1>
          </div>
          <div className="text-white text-1xl font-mono">
            <textarea placeholder="Type your prompt here..." 
            className="p-3 placeholder-opacity-70 bg-black placeholder-slate-100 
            rounded-md h-96 w-full text-white border border-purple-300 focus:border-purple-500 " 
            value={newResponse} onChange={(e) => setNewResponse(e.target.value)}>
            </textarea>
            <button disabled={disabled}
            className="rounded-full bg-emerald-700 mt-2 px-6 py-3 font-semibold text-white no-underline 
            transition hover:bg-emerald-800 disabled:bg-white/5 disabled:text-gray-700"
            onClick={getResponse}
            >
            Done
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

