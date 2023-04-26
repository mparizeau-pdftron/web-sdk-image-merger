Core.setWorkerPath('./webviewer-lib/core');

const mergeImage = async () => {
  const startTime = performance.now();

  const initialDocument = await Core.createDocument('./images/file_example_JPG_1MB.jpg', { loadAsPDF: true });

  for (let i = 0; i < 40; i++) {
    await initialDocument.mergeDocument('./images/file_example_JPG_1MB.jpg');
    console.log(`merged ${i} 1MB`);
    await initialDocument.mergeDocument('./images/file_example_JPG_2500kB.jpg');
    console.log(`merged ${i} 2.5MB`);
  }
  console.log('done!');

  const fileData = await initialDocument.getFileData();
  const data = new Uint8Array(fileData);
  const blobData = new Blob([data], { type: 'application/pdf' });
  saveAs(blobData, 'merged.pdf');

  console.log(`Time taken: ${performance.now() - startTime}`);
};

mergeImage();