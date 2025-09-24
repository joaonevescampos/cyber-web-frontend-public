import { useSummary } from '../../hooks/useSummary';
import Loading from '../modal/Loading';
import StarIcon from './StarIcon';

const RatingBar = ({ label, count, total }: { label: string; count: number; total: number }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
        <div className="flex items-center gap-4 text-sm">
            <span className="w-28 font-medium">{label}</span>
            <div className="flex-grow bg-[#D9D9D9] rounded-full h-1">
                <div
                    className="bg-[#FFB547] h-1 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-8 text-right text-gray-600">{count}</span>
        </div>
    );
};

const ReviewSummary = ({ productId }: { productId: string | undefined }) => {
    const { summary, loading, error } = useSummary(productId);

    if (loading) {
        return <div className="h-48 flex justify-center items-center"><Loading /></div>;
    }

    if (error || !summary || summary.reviews === 0) {
        return null;
    }

    const ratingBars = [
        { label: 'Excellent', count: summary.excellent },
        { label: 'Good', count: summary.good },
        { label: 'Average', count: summary.average },
        { label: 'Below Average', count: summary.below_average },
        { label: 'Poor', count: summary.poor },
    ];

    const renderSummaryStars = () => {
        const starElements = [];
        const fullStars = Math.floor(summary.media);
        const decimalPart = summary.media % 1;

        for (let i = 0; i < fullStars; i++) {
            starElements.push(<StarIcon key={`full-${i}`} className="text-[#FFB547]" />);
        }

        if (decimalPart > 0 && fullStars < 5) {
            starElements.push(
                <div key="decimal" className="relative">
                    <StarIcon className="text-[#f0b100] fill-transparent" />
                    <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${decimalPart * 100}%` }}>
                        <StarIcon className="text-[#FFB547]" />
                    </div>
                </div>
            );
        }

        const remainingStars = 5 - starElements.length;
        for (let i = 0; i < remainingStars; i++) {
            starElements.push(<StarIcon key={`empty-${i}`} className="text-[#f0b100] fill-transparent" />);
        }

        return starElements;
    };

    return (
        <section className="mx-auto mt-20 max-w-[1191px]">
            <h2 className="text-xl font-medium mb-10">Reviews</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 rounded-lg bg-white">
                <div className="bg-gray-50 p-8 rounded-lg w-full md:w-40 md:h-40">
                    <div className="hidden md:flex flex-col items-center justify-center h-full">
                        <p className="text-5xl font-medium">{summary.media.toFixed(1)}</p>
                        <p className="text-sm text-gray-500 my-3">of {summary.reviews} reviews</p>
                        <div className="flex gap-1">{renderSummaryStars()}</div>
                    </div>
                    <div className="flex md:hidden flex-row items-center justify-center gap-x-6">
                        <div className="flex flex-col items-center">
                            <p className="text-5xl font-medium">{summary.media.toFixed(1)}</p>
                            <p className="text-sm text-gray-500 mt-1">of {summary.reviews} reviews</p>
                        </div>
                        <div className="flex gap-1">{renderSummaryStars()}</div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                    {ratingBars.map(bar => (
                        <RatingBar key={bar.label} label={bar.label} count={bar.count} total={summary.reviews} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSummary;
