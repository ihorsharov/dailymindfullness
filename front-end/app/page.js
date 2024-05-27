import { redirect } from 'next/navigation';

const HomePage = async () => {
  redirect('/LoginRegister');
};
export default HomePage;
