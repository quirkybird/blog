import Mkd from '../common/Mkd';
import GiscusComment from '../common/GiscusComment';

const InformalBlog = ({ blog }) => {
  const shadowInfo = 'shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]';
  return (
    <main className="min-h-[calc(100vh-76px)]">
      <article className="max-w-[900px] m-auto relative">
        <section className="mt-20 text-center px-5 md:text-start">
          <h1 className="text-2xl lg:text-3xl font-[800] mb-3">{blog.title}</h1>
          <span>{blog.create_at}</span>
          <span> | 字数检测：{blog.content.length}</span>
        </section>
        {/* markdown组件，传入数据可以直接按照markdow渲染 */}
        <div
          className={`rounded-md ${shadowInfo} my-5`}
          style={{ fontSzie: '16px' }}
        >
          <Mkd markdown={blog.content} />
        </div>
        <span className="px-5">更新时间：{blog.update_at}</span>
        <GiscusComment />
      </article>
    </main>
  );
};

export default InformalBlog;
