import axios from "axios";

export async function getImages() {
  const response = await axios.get(
    `https://electricAlchemy.io/server/artworks`);
  return response.data;
}

export async function getCodeProjects() {
  const response = await axios.get(
    `https://electricAlchemy.io/server/code`);
  return response.data;
}
