import path from "path";
import base64ToImage from "base64-to-image";
import { v4 } from "uuid";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const PROFILE_IMAGE_PATH = path.join(process.cwd(), "api/storage/users");

const base64ImageToFile = (base64, fileName) => {
  const imageInfo = base64ToImage(base64, `${PROFILE_IMAGE_PATH}/`, {
    fileName,
  });
  return `/${imageInfo.fileName}`;
};

export default async function handler(req, res) {
  const { base64Image } = req.body;

  if (req.method !== "POST") {
    return res.status(400).send({ message: "bad request" });
  }

  if (!base64Image) {
    return res.status(400).send({ message: "bad request" });
  }

  try {
    const fileName = v4();
    const filePath = base64ImageToFile(base64Image, fileName);
    res.status(201).send({ filePath });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: "bad request" });
  }
}
