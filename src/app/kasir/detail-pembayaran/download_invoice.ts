import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';


export default class AppComponent{
  public download_invoice(bodyTable: any, tax: number, total: number, totalAmount: number){
    const doc = new jspdf();
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
            +'\nDate: 2022-01-27'
            +'\nInvoice number: 123456',
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: 'Billed to:'
    //         +'\nJohn Doe'
    //         +'\nBilling Address line 1'
    //         +'\nBilling Address line 2'
    //         +'\nZip code - City'
    //         +'\nCountry',
    //         styles: {
    //           halign: 'left'
    //         }
    //       },
    //       {
    //         content: 'Shipping address:'
    //         +'\nJohn Doe'
    //         +'\nShipping Address line 1'
    //         +'\nShipping Address line 2'
    //         +'\nZip code - City'
    //         +'\nCountry',
    //         styles: {
    //           halign: 'left'
    //         }
    //       },
    //       {
    //         content: 'From:'
    //         +'\nCompany name'
    //         +'\nShipping Address line 1'
    //         +'\nShipping Address line 2'
    //         +'\nZip code - City'
    //         +'\nCountry',
    //         styles: {
    //           halign: 'right'
    //         }
    //       }
    //     ],
    //   ],
    //   theme: 'plain'
    // });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: 'Amount due:',
    //         styles: {
    //           halign:'right',
    //           fontSize: 14
    //         }
    //       }
    //     ],
    //     [
    //       {
    //         content: '$4000',
    //         styles: {
    //           halign:'right',
    //           fontSize: 20,
    //           textColor: '#3366ff'
    //         }
    //       }
    //     ],
    //     [
    //       {
    //         content: 'Due date: 2022-02-01',
    //         styles: {
    //           halign:'right'
    //         }
    //       }
    //     ]
    //   ],
    //   theme: 'plain'
    // });

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
      body: [
        [
          {
            content: 'Subtotal:',
            styles:{
              halign:'right'
            }
          },
          {
            content: total.toString(),
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
            content: tax.toString(),
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
            content: totalAmount.toString(),
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: 'Terms & notes',
    //         styles: {
    //           halign: 'left',
    //           fontSize: 14
    //         }
    //       }
    //     ],
    //     [
    //       {
    //         content: 'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia'
    //         +'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum'
    //         +'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
    //         styles: {
    //           halign: 'left'
    //         }
    //       }
    //     ],
    //   ],
    //   theme: "plain"
    // });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: 'This is a centered footer',
    //         styles: {
    //           halign: 'center'
    //         }
    //       }
    //     ]
    //   ],
    //   theme: "plain"
    // });

    return doc.save("invoice");
  }
}