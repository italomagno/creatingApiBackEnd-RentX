import fs from "fs";

export const deleteFile = async(filename:string)=>{
  //stat verifica se o arquivo existe ou não
  try{
    await fs.promises.stat(filename)
  }catch(err){
    return;
  }
  
  await fs.promises.unlink(filename);
}