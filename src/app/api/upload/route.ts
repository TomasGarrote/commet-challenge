import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { transformDealsA, transformDealsB } from "../../utils/transformData";
import Papa from "papaparse";

const prisma = new PrismaClient();

//Recibe un JSON o CSV y lo guarda en la BD
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    //Si el archivo no existe pero se utilizo el boton de subir da error
    if (!file) {
      return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
    }

    const text = await file.text(); // Convierte el contenido de un archivo (almacenado en un Blob) en una cadena de texto (string).
    let fileData; // Variable para guardar la informacion de los archivos

    if (file.type === "application/json") {
      fileData = JSON.parse(text); // Parseamos el string a JSON
      fileData = transformDealsA(fileData)
    } else if (file.type === "text/csv") {
      // Parseamos el CSV a un tipo que pueda leer la funcion de trasnformacion
      fileData = Papa.parse(text, {
              header: true
            }).data;
      fileData = transformDealsB(fileData)
    } else {
      return NextResponse.json({ error: "Formato de archivo no soportado" }, { status: 400 });
    }

    //Guardo los datos en la bd de prisma
    const newDeal = await prisma.deal.createMany({
      data: fileData,
    });

    return NextResponse.json({ message: "Datos guardados correctamente", count: newDeal.count });
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json({ error: "Error al procesar el Archivo" }, { status: 500 });
  }
}

//Devovler todos los datos de la bd
export async function GET() {
  try {
    const deals = await prisma.deal.findMany();
    return NextResponse.json(deals);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
}