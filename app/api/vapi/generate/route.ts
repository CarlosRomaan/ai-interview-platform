import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json({ success: true, data: "Thank you for using our service!" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userId } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
      `
    });

    // const { text: questions } = await generateText({
    //   model: google("gemini-2.0-flash-001"),
    //   prompt: `Prepara preguntas para una entrevista de trabajo.
    //     El rol del trabajo es desarrollador frontend.
    //     La experiencia del trabajo es de desarrollador junior.
    //     El stack es de React, Javascript, Typescript, Tailwind CSS.
    //     Las preguntas deben ser en cuestión técnica.
    //     La cantidad de preguntas son 8 preguntas.
    //     Por favor regresa sólamente las preguntas, sin texto adicional.
    //     Las preguntas serán leidas por un asistente de voz, así que no utilices "/" o "*" o cualquier caracter especial que pueda romper el asistente de voz.
    //     Regresa las preguntas en el siguiente formato:
    //     ["Pregunta 1", "Pregunta 2", "Pregunta 3"]
        
    //     ¡Gracias! <3
    //   `
    // });

    const interview = {
      role, type, level, 
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString()
    }

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error(err);

    return Response.json({ success: false, err }, { status: 500 });
  }
}