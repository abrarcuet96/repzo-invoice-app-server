// /* eslint-disable no-undef */
// import { GridFSBucket } from 'mongodb';
// import mongoose from 'mongoose';
// import { getConnection } from '../../../../server';
// import { IPDF, IUploadedFile } from './pdf.interface';
// let bucket: GridFSBucket | null = null;
// // Initialize GridFSBucket once the connection is open
// getConnection().once('open', () => {
//   if (mongoose.connection.db) {
//     bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//       bucketName: 'pdfs',
//     });
//     console.log('GridFS bucket initialized.');
//   } else {
//     console.error('Mongoose connection DB is undefined.');
//   }
// });

// // Service to upload a PDF
// export const uploadPDF = (file: Express.Multer.File): Promise<IPDF> => {
//   return new Promise((resolve, reject) => {
//     if (!bucket) {
//       return reject(new Error('GridFS bucket is not initialized.'));
//     }

//     const uploadStream = bucket.openUploadStream(file.originalname, {
//       contentType: file.mimetype,
//     });

//     uploadStream.end(file.buffer);

//     uploadStream.on('finish', (uploadedFile: IUploadedFile) => {
//       resolve({
//         _id: uploadedFile._id.toString(), // Convert ObjectId to string
//         filename: uploadedFile.filename,
//         contentType: uploadedFile.contentType,
//       });
//     });

//     uploadStream.on('error', (error) => {
//       console.error('Error uploading file to GridFS:', error);
//       reject(error);
//     });
//   });
// };

// // Service to retrieve a PDF by ID
// export const getPDFById = (id: string): Promise<Buffer> => {
//   return new Promise((resolve, reject) => {
//     if (!bucket) {
//       return reject(new Error('GridFS bucket is not initialized.'));
//     }

//     const downloadStream = bucket.openDownloadStream(
//       new mongoose.Types.ObjectId(id),
//     );
//     const chunks: Buffer[] = [];

//     downloadStream.on('data', (chunk) => chunks.push(chunk));
//     downloadStream.on('end', () => resolve(Buffer.concat(chunks)));
//     downloadStream.on('error', (error) => {
//       console.error('Error retrieving file from GridFS:', error);
//       reject(error);
//     });
//   });
// };
// export const PDFConroller = {};
