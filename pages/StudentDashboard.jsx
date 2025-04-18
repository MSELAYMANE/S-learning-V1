import { useState, useEffect } from 'react';
import { FiSearch, FiBookmark, FiHeart, FiMessageSquare, FiShare2, FiSettings } from 'react-icons/fi';
import { FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch all data in parallel for better performance
        const [userResponse, postsResponse, coursesResponse] = await Promise.all([
          fetch('http://localhost:5000/api/students/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/student/posts', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/student/courses', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        if (!coursesResponse.ok) throw new Error('Failed to fetch courses');

        const [userData, postsData, coursesData] = await Promise.all([
          userResponse.json(),
          postsResponse.json(),
          coursesResponse.json()
        ]);

        setUser(userData);
        setPosts(postsData);
        setCourses(coursesData);
        setError(null);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        if (error.message.includes('401') || error.message.includes('403')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleLike = async (postId) => {
    try {
      // Optimistic update
      setPosts(posts.map(post => post.id === postId ? {
        ...post,
        isLiked: !post.isLiked,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1
      } : post));

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // Revert if API call fails
        setPosts(posts);
        throw new Error('Failed to toggle like');
      }

      // Optionally sync with server response
      const data = await response.json();
      setPosts(posts.map(post => post.id === postId ? {
        ...post,
        isLiked: data.isLiked,
        likes: data.likes
      } : post));

    } catch (error) {
      console.error('Error toggling like:', error);
      setError('Failed to update like. Please try again.');
    }
  };

  const toggleBookmark = async (postId) => {
    try {
      // Optimistic update
      setPosts(posts.map(post => post.id === postId ? {
        ...post,
        isBookmarked: !post.isBookmarked
      } : post));

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/bookmark`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        setPosts(posts);
        throw new Error('Failed to toggle bookmark');
      }

    } catch (error) {
      console.error('Error toggling bookmark:', error);
      setError('Failed to update bookmark. Please try again.');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'enrolled') return matchesSearch && courses.some(c => c.name === post.subject);
    if (activeTab === 'bookmarked') return matchesSearch && post.isBookmarked;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || 'Error loading user data'}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Error Notification */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Left Sidebar - Profile Section */}
      <div className="w-80 bg-white shadow-md p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <img 
            src={user.profilePicture || 'https://randomuser.me/api/portraits/women/44.jpg'} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Learning Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <FaGraduationCap className="text-indigo-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Courses Enrolled</p>
                <p className="font-medium">{courses.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaChalkboardTeacher className="text-indigo-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Learning Hours</p>
                <p className="font-medium">
                  {courses.reduce((total, course) => total + (course.hours || 0), 0)} hrs
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FiSettings className="text-indigo-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium">{user.level || 'Beginner'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">My Courses</h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course.id} className="bg-indigo-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-gray-800">{course.name}</h4>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {course.progress || 0}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">by {course.teacher}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No courses enrolled yet</p>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Learning Goal</h3>
          <p className="text-sm bg-indigo-100 text-indigo-800 p-3 rounded-lg">
            {user.learningGoal || 'No learning goal set yet'}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="relative mb-6">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, teachers, or subjects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'enrolled', 'bookmarked'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full capitalize ${
                    activeTab === tab 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'all' ? 'All Posts' : tab === 'enrolled' ? 'My Courses' : 'Bookmarked'}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <img 
                      src={post.teacherAvatar || 'https://randomuser.me/api/portraits/women/65.jpg'} 
                      alt={post.teacher} 
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{post.teacher}</h3>
                      <p className="text-sm text-gray-500">{post.subject} • {post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button 
                        className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <FiHeart className={post.isLiked ? 'fill-current' : ''} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-500">
                        <FiMessageSquare />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-500">
                        <FiShare2 />
                      </button>
                    </div>
                    <button 
                      className={`${post.isBookmarked ? 'text-indigo-500' : 'text-gray-500 hover:text-indigo-500'}`}
                      onClick={() => toggleBookmark(post.id)}
                    >
                      <FiBookmark className={post.isBookmarked ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;