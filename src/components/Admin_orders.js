import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Admin_orders() {
  const [orders, setOrders] = useState([]);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const { id: initialId } = useParams();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  useEffect(() => {
    axios.get('http://localhost:3001/admin_orders')
      .then(result => {
        console.log("api result");
        console.log(result.data);
        setOrders(result.data);
        setRecords(result.data);
        //update_total(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (initialId === '1') {
      console.log("id 1 waala celled");
      const filteredOrders = orders.filter(order => order.day === date.getDate() && order.month===month);
      setRecords(filteredOrders);
      console.log("filterd array");
      update_total(filteredOrders)
      console.log(records);
    } 
    else if(initialId==='3'){
      console.log("3 id wala calld");
      const filteredOrders = orders.filter(order => order.month ===month);
      setRecords(filteredOrders);
      console.log("filterd array");
      update_total(filteredOrders)
      console.log(records);
    }
    else{
      let start_day=day-7
      if(start_day<=0)
      {
        start_day=1
      }
      console.log("2 id wala ")
      const filteredOrders = orders.filter(order => order.day>=start_day && order.day<=day)
      setRecords(filteredOrders)
      console.log("filterd array")
      update_total(filteredOrders)
      console.log(records)
    }
  }, [initialId, orders]);

  const update_total = (result) => {
    let bill = 0;
    result.forEach((order) => {
      console.log(order.total);
      bill += order.total;
    });
    setTotal(bill);
  };

  return (
    <div>
      <h1>Admin orders</h1>
      {records.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <p>{item.item}: {item.quantity}</p>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No orders placed yet</h1>
      )}
      <p className="mt-4">Total sale: Rs{total}</p>
    </div>
  );
}
