import { useState } from "react";
// import { useAuth } from "../context/auth.context"
import orderService from "../services/orderservice";
import{toast} from "react-toastify"
import customerService from "../services/customerservice";
import OrderLineCustomer from "../common/OrderLineCustomer";

const CustomerOrderList = () => {
	// const {worker} = useAuth()
	const [orders, setOrders] = useState([]);
	const [customerId, setCustomerId] = useState("");
	const [customerData, setCustomerData] = useState(null);

	const handleSearch = async () => {
		try {
			const response = await customerService.getCustomerWithId(customerId);
			const data = await response.data;
			setCustomerData(data);
			const orders1 = customerData;
			const realOrders = [];
			for (let i = 0; i < orders1.orders?.length; i++) {
				let order = await orderService.getOrderById(orders1.orders[i]._id);
				realOrders.push(order.data);
			}
			setOrders(realOrders);
		} catch{
			toast.warn("Error fetching customer orders:");
		}
	};
	return (
		<>
			{orders.length === 0 && (
				<div className='container mt-5 w-25'>
					<div className='row mb-3'>
						<label htmlFor='israeliId' className='form-label'>
							תעודת זהות
							<input
                                name="israeliId"
                                id="israeliId"
								type='text'
								value={customerId}
								className='form-control'
								onChange={(e) => {
									setCustomerId(e.target.value);
								}}
							/>
						</label>
						<button
							className='btn btn-primary m-2'
							type='button'
							onClick={handleSearch}>
							חפש!
						</button>
					</div>
				</div>
			)}

			{orders?.length > 0 && (
				<>
					<div className='container w-auto'>
						<h1>רשימת הזמנות</h1>
						<h2>
							{customerData.name.first} {customerData.name.last}{" "}
						</h2>
						<table className='table'>
							<thead>
								<tr>
									<th>מספר הזמנה</th>
									<th>כמות שורות</th>
									<th>כמות פריטים</th>
									<th>מספר סוכן </th>
									<th>סה"כ</th>
									<th>תאריך קניה</th>
									<th>שולם</th>
									<th>סופק</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<OrderLineCustomer
										key={order.orderNum}
										order={order}></OrderLineCustomer>
								))}
							</tbody>
						</table>
						<button
							className='btn btn-outline-primary'
							onClick={() => setOrders([])}>
							חפש ת"ז אחרת
						</button>
					</div>
				</>
			)}
		</>
	);
};
export default CustomerOrderList;
