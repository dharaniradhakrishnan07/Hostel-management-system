import Payment from './Payment';

const Dashboard = () => {
  return (
    <div>
      <h2>Hostel Fee: ₹5000/month</h2>
      <Payment amount={5000} receipt="hostel_fee_001" />
    </div>
  );
};