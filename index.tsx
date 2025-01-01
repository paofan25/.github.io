import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FaUserCircle, FaEdit, FaBlog } from 'react-icons/fa';

// Mock blog data (would typically come from a backend)
const initialBlogs = [
  {
    id: 1,
    title: '我的第一篇博客',
    content: '这是我的第一篇博客文章，记录下生活中的点点滴滴，分享一些有趣的想法和经历。',
    author: '张三',
    date: '2024-03-20'
  },
  {
    id: 2,
    title: '技术分享：React最佳实践',
    content: '在这篇文章中，我将分享使用React开发时的一些最佳实践和经验，希望能帮助到其他开发者。',
    author: '张三',
    date: '2024-03-15'
  },
  // 添加更多博客文章...
].concat(Array.from({ length: 8 }, (_, i) => ({
  id: i + 3,
  title: `博客标题 ${i + 3}`,
  content: `这是一篇测试博客文章，用于填充页面内容。内容简短精炼，展示博客预览效果。`,
  author: '张三',
  date: '2024-03-10'
})));

const BlogHomepage: React.FC = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<typeof initialBlogs[0] | null>(null);

  // 搜索博客功能
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filteredBlogs = initialBlogs.filter(blog => 
      blog.title.toLowerCase().includes(term.toLowerCase()) || 
      blog.content.toLowerCase().includes(term.toLowerCase())
    );
    
    setBlogs(filteredBlogs);
  };

  // 打开全文阅读
  const openBlogDetail = (blog: typeof initialBlogs[0]) => {
    setSelectedBlog(blog);
  };

  // 关闭博客详情
  const closeBlogDetail = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaBlog className="text-2xl text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">我的博客</h1>
        </div>
        
        {/* 搜索栏 */}
        <div className="flex-grow mx-8 relative">
          <input 
            type="text" 
            placeholder="搜索博客..." 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        
        {/* 用户操作 */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            <FaEdit />
            <span>写博客</span>
          </button>
          <FaUserCircle className="text-3xl text-gray-600" />
        </div>
      </nav>

      {/* 博客列表 */}
      <div className="container mx-auto px-4 py-8">
        {selectedBlog ? (
          // 博客详情视图
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <p className="text-gray-700 mb-4">{selectedBlog.content}</p>
            <div className="flex justify-between items-center text-gray-500">
              <span>作者：{selectedBlog.author}</span>
              <span>发布日期：{selectedBlog.date}</span>
            </div>
            <button 
              onClick={closeBlogDetail}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              返回列表
            </button>
          </div>
        ) : (
          // 博客预览列表
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div 
                key={blog.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer"
                onClick={() => openBlogDetail(blog)}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogHomepage;
