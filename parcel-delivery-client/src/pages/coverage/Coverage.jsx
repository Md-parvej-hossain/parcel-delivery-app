import { useLoaderData } from 'react-router';
import Map from './Map';

const Coverage = () => {
  const districtsData = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold "> We are available in 64 districts</h1>
      <h1 className="text-2xl font-bold  pt-10">
        We deliver almost all over Bangladesh
      </h1>
      <Map districtsData={districtsData} />
    </div>
  );
};

export default Coverage;
