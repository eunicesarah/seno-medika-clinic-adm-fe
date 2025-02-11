import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';


export default class AppComponent{
  public async download_invoice(bodyTable: any, tindakanTable: any, tax: number, total: number, totalAmount: number, date: string){
    const doc = new jspdf();
    // const img = new Image();
    // img.src = '../../../../public/logo_seno.png';
    // await img.decode();

    // // Create a canvas and draw the image onto it
    // const canvas = document.createElement('canvas');
    // canvas.width = img.width;
    // canvas.height = img.height;
    // const ctx = canvas.getContext('2d');
    // if (ctx) {
    //   ctx.drawImage(img, 0, 0);
    // }

    // // Convert the canvas to a Data URL
    // const dataUrl = canvas.toDataURL('image/png');

    // // Add the image to the PDF
    // doc.addImage(dataUrl, 'PNG', 10, 10, 50, 50);
    autoTable(doc, {
      body: [
        [
          {
            content: 'Klinik Seno Medika',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Invoice',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#71A995'
      }
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Reference: #INV0001'
            +'\nDate: '+date
            +'\nInvoice number: 123456',
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Obat & Tindakan',
            styles: {
              halign:'left',
              fontSize: 14
            }
          }
        ]
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      head: [['No', 'Obat', 'Jumlah', 'Harga Persatuan', 'Total']],
      body: bodyTable,
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      }
    });
    autoTable(doc, {
      head: [['No', 'Tindakan', 'Harga']],
      body: tindakanTable,
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      }
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles:{
              halign:'right'
            }
          },
          {
            content: 'Rp'+total.toString(),
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Total tax:',
            styles:{
              halign:'right'
            }
          },
          {
            content: 'Rp'+tax.toString(),
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Total amount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: 'Rp'+totalAmount.toString(),
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });

    
    return doc.save("invoice");
  }
}