import PostList from '@components/PostList';
import {
	PostListContainer,
	Header,
	CategoryList,
	Category,
	BlogHeaderContainer,
	HeaderContainer,
} from '@components/custom-tw-components';
import utilStyles from '@styles/utils.module.scss';
import Link from 'next/link';

const BlogLayout = ({ posts }) => {
	return (
		<div>
			<PostListContainer>
				<HeaderContainer>
					<div>
						<Link
							key={'home'}
							href={'/'}
							passHref>
							{'rolemadelen'}
						</Link>
					</div>
					<div>
						<div className={'currentPage'}>
							<Link
								key={'blog'}
								href={'/blog'}
								passHref>
								{'blog'}
							</Link>
						</div>
						<div>
							<Link
								key={'note'}
								href={'/blog/note'}
								passHref>
								{'note'}
							</Link>
						</div>
					</div>
				</HeaderContainer>
			</PostListContainer>

			<PostListContainer>
				{console.dir(posts)}
				<PostList posts={posts} />
			</PostListContainer>
		</div>
	);
};

export default BlogLayout;
