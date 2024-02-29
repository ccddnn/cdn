import { mkdir, readdir, copyFile } from 'node:fs/promises';

async function pickToDir(dir, prob) {
  let filenames = await readdir(dir)
  filenames.forEach(async filename => {
    if(getProb(prob)) {
      await copyFile(dir+'/'+filename, './pick/'+filename)
      console.log(['copy '+dir+'/'+filename + ' success'])
    }
  })
}

function getProb(f) {
  return f > Math.random()
}

await mkdir('./pick')
pickToDir('./class1',0.5)
pickToDir('./class2',0.15)
pickToDir('./class3',0.02)
pickToDir('./class4',0.005)
