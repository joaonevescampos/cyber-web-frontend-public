import type { CommentsType, MetadataType } from '../../models/Comments';
import Comment from './Comment';
import Loading from '../modal/Loading';
import arrowDownIcon from '../../assets/img/arrow-down_icon.svg';
import arrowDownLightIcon from '../../assets/img/arrow-down-light_icon.svg';

interface CommentListProps {
    comments: CommentsType[];
    metadata: MetadataType | null;
    loading: boolean;
    error: string | null;
    loadMoreComments: () => void;
}

const CommentList = ({
    comments,
    metadata,
    loading,
    error,
    loadMoreComments,
}: CommentListProps) => {
    return (
        <section className="mx-auto py-8 max-w-[1191px]">
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="flex flex-col gap-6">
                {comments.map((commentData) => (
                    <Comment
                        key={`${commentData.id}-${commentData.created_at}`}
                        id={commentData.id}
                        name_user={commentData.name_user}
                        url_image_user={commentData.url_image_user}
                        message={commentData.message}
                        rating={commentData.rating}
                        created_at={commentData.created_at}
                    />
                ))}
            </div>

            {loading && (
                <div className="flex justify-center mt-8">
                    <Loading />
                </div>
            )}

            {!loading && comments.length === 0 && (
                <p className="text-center text-gray-500 mt-8">Este produto ainda não possui avaliações.</p>
            )}

            {!loading && comments.length > 0 && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={loadMoreComments}
                        disabled={!metadata?.next_page}
                        className="flex justify-center items-center gap-2 px-12 lg:px-14 py-3 lg:py-4 border border-black rounded-md text-black text-base font-medium leading-6 hover:bg-gray-100 hover:cursor-pointer transition-colors w-fit disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        View More
                        <img
                            src={!metadata?.next_page ? arrowDownLightIcon : arrowDownIcon}
                            alt="Ver mais"
                            className="w-4 h-4"
                        />
                    </button>
                </div>
            )}
        </section>
    );
};

export default CommentList;
