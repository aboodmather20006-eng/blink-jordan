import { SizeGuide } from '@/components/store/size-guide';
export const metadata = { title: 'Size Guide' };
export default function Page() {
  return (
    <div className="wrap info-page">
      <div className="page-heading">
        <h1>FIND YOUR FIT.</h1>
      </div>
      <SizeGuide />
    </div>
  );
}
