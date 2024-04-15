import React, { useEffect, useState } from 'react';
import { useName } from '../NameContext';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'; 

export default function Reports() {
    const [invoice, setInvoice] = useState([]);
    const { email, setEmail, name, setName, userId, setUserId } = useName();

    useEffect(() => {
        axios.get('http://localhost:3001/user_invoice/' + email)
            .then(result => {
                console.log("invoices page + results ");
                console.log(result.data);
                setInvoice(result.data);
                console.log("after");
                console.log(invoice);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    const Download_invoice = (invoiceItem) => {
        const capture=document.querySelector('.invoice')

            html2canvas(capture).then((canvas)=>{
                const imgData=canvas.toDataURL('img/png')
                const doc = new jsPDF('p', 'pt', 'a4'); 
                const imgWidth=410
                const imgHeight=canvas.height*imgWidth/canvas.width
                doc.addImage(imgData,'PNG',0,0,imgWidth,imgHeight)
                doc.save('receipt.pdf')
            })
    }
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">{name} your previous invoices</h1>
            {invoice.length > 0 ? (
                invoice.map((invoiceItem, index) => (
                    <div key={index} className="mb-6 invoice">
                        <h2 className="text-xl font-semibold mb-2 ml-10">Invoice No: {index+1}</h2>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">Item</th>
                                    <th className="border border-gray-200 px-4 py-2">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceItem.items.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className="border border-gray-200 px-4 py-2">{item.item}</td>
                                        <td className="border border-gray-200 px-4 py-2">{item.quantity}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2" className="border border-gray-200 px-4 py-2">
                                        Total: {invoiceItem.total}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2" className="border border-gray-200 px-4 py-2">
                                        Date: {invoiceItem.date}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <button className='bg-blue-400 rounded mt-6 but' onClick={() => Download_invoice(invoiceItem)}>
                     Download Invoice
                      </button>
                    </div>
                     
                ))
            ) : (
                <h1 className="text-xl">You do not have any invoices before</h1>
            )}
        </div>
    );
}
