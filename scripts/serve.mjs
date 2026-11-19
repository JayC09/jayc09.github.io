import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
const root=process.cwd(),port=Number(process.env.PORT||4173);
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".webp":"image/webp",".png":"image/png",".pdf":"application/pdf",".ttf":"font/ttf"};
createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,"http://localhost");
    const file=resolve(root,"."+decodeURIComponent(url.pathname==="/" ? "/index.html" : url.pathname));
    if(!file.startsWith(root+sep)){res.writeHead(403).end();return}
    res.setHeader("Content-Type",mime[extname(file)]||"application/octet-stream");
    res.setHeader("Cache-Control","no-cache");
    res.end(await readFile(file));
  }catch{res.writeHead(404).end("Not found")}
}).listen(port,"127.0.0.1",()=>console.log("Portfolio preview: http://127.0.0.1:"+port));
