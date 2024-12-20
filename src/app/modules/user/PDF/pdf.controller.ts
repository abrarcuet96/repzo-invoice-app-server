// // controllers/pdf.controller.ts
// import { Request, Response } from 'express';
// import { getPDFById, uploadPDF } from './pdf.service';

// export const uploadPDFController = async (req: Request, res: Response) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).send({ message: 'No file uploaded' });

//     const pdfData = await uploadPDF(file);
//     res.status(201).send(pdfData);
//   } catch (error) {
//     res.status(500).send({ message: 'Error uploading PDF', error });
//   }
// };

// export const getPDFController = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const pdfBuffer = await getPDFById(id);

//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `inline; filename="${id}.pdf"`,
//     });
//     res.send(pdfBuffer);
//   } catch (error) {
//     res.status(500).send({ message: 'Error fetching PDF', error });
//   }
// };
