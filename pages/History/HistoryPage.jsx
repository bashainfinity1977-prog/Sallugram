import React, { useState, useEffect } from 'react';
import { FaSearch, FaClock, FaTrash, FaPlay, FaEye, FaThumbsUp, FaHistory, FaCalendarAlt, FaFire, FaFilter, FaEllipsisH, FaFilm, FaNewspaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { firestore, auth } from '../../firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import './HistoryPage.css';
import Navbar from '../../components/Navbar/Navbar';

const HistoryPage = () => {
  const [activeItem, setActiveItem] = useState('History');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, authLoading] = useAuthState(auth);
  const navigate = useNavigate();

  // Helper function to get navigation route based on content type
  const getNavigationRoute = (item) => {
    const type = item.type || (item.thumbnailUrl?.includes('shorts') ? 'short' : 'video');
    switch (type) {
      case 'short':
        return `/short/${item.videoId}`;
      case 'post':
        return `/post/${item.videoId}`;
      case 'video':
      default:
        return `/video/${item.videoId}`;
    }
  };

  // Helper function to get icon based on content type
  const getTypeIcon = (item) => {
    const type = item.type || (item.thumbnailUrl?.includes('shorts') ? 'short' : 'video');
    switch (type) {
      case 'short':
        return FaFilm;
      case 'post':
        return FaNewspaper;
      case 'video':
      default:
        return FaPlay;
    }
  };

  // Helper function to get type label
  const getTypeLabel = (item) => {
    const type = item.type || (item.thumbnailUrl?.includes('shorts') ? 'short' : 'video');
    switch (type) {
      case 'short':
        return 'Short';
      case 'post':
        return 'Post';
      case 'video':
      default:
        return 'Video';
    }
  };

  // Helper function to get thumbnail URL based on content type
  const getThumbnailUrl = (item) => {
    const actualType = item.type || (item.thumbnailUrl?.includes('shorts') ? 'short' : 'video');
    switch (actualType) {
      case 'short':
        return item.thumbnailUrl || item.videoUrl || 'https://picsum.photos/400/225?random=' + item.videoId;
      case 'post':
        return item.imageUrl || item.thumbnailUrl || 'https://picsum.photos/400/225?random=' + item.videoId;
      case 'video':
      default:
        return item.thumbnailUrl || 'https://picsum.photos/400/225?random=' + item.videoId;
    }
  };

  // Fetch user's watch history from Firestore
  useEffect(() => {
    if (authLoading || !user) return;

    setLoading(true);
    const userDocRef = doc(firestore, 'users', user.uid);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const history = userData.watchHistory || [];
        
        // Sort by watchedAt timestamp (most recent first)
        const sortedHistory = history.sort((a, b) => {
          let timeA, timeB;
          
          // Handle ISO strings (new approach)
          if (typeof a.watchedAt === 'string') {
            timeA = new Date(a.watchedAt);
          } else if (a.watchedAt && typeof a.watchedAt.toDate === 'function') {
            timeA = a.watchedAt.toDate(); // Handle old Timestamp objects
          } else if (a.watchedAt instanceof Date) {
            timeA = a.watchedAt;
          } else {
            timeA = new Date(a.watchedAt);
          }
          
          if (typeof b.watchedAt === 'string') {
            timeB = new Date(b.watchedAt);
          } else if (b.watchedAt && typeof b.watchedAt.toDate === 'function') {
            timeB = b.watchedAt.toDate(); // Handle old Timestamp objects
          } else if (b.watchedAt instanceof Date) {
            timeB = b.watchedAt;
          } else {
            timeB = new Date(b.watchedAt);
          }
          
          return timeB - timeA;
        });
        
        setWatchHistory(sortedHistory);
      } else {
        setWatchHistory([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching watch history:', error);
      setWatchHistory([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authLoading, user]);

  const handleItemClick = (item) => {
    setActiveItem(item);
    switch (item) {
      case 'Home': navigate('/home'); break;
      case 'Videos': navigate('/videos'); break;
      case 'Shorts': navigate('/shorts'); break;
      case 'Posts': navigate('/posts'); break;
      case 'Explore': navigate('/explore'); break;
      case 'Settings': navigate('/settings'); break;
      case 'Send Feedback': navigate('/feedback'); break;
      case 'Help': navigate('/help'); break;
      default: break;
    }
  };


  const filteredHistory = watchHistory.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.authorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectItem = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (!user) return;
    
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const itemsToDelete = Array.from(selectedItems);
      
      // Remove selected items from watch history
      await updateDoc(userDocRef, {
        watchHistory: arrayRemove(...itemsToDelete)
      });
      
      setSelectedItems(new Set());
    } catch (error) {
      console.error('Error deleting history items:', error);
    }
  };

  const handleClearHistory = async () => {
    if (!user) return;
    
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, {
        watchHistory: []
      });
      setSelectedItems(new Set());
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const formatViews = (views) => {
    if (!views) return '0 views';
    if (views < 1000) return `${views} views`;
    if (views < 1000000) return `${(views / 1000).toFixed(1)}K views`;
    return `${(views / 1000000).toFixed(1)}M views`;
  };

  const formatDuration = (duration) => {
    return duration || '0:00';
  };

  const formatDate = (timestamp) => {
    let date;
    
    // Handle ISO strings (new approach)
    if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (timestamp && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate(); // Handle old Timestamp objects
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Unknown time';
    }
    
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 24) {
      return diffInHours < 1 ? 'Today' : `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const groupByDate = (items) => {
    const groups = {};
    const now = new Date();
    
    items.forEach(item => {
      let date;
      
      // Handle ISO strings (new approach)
      if (typeof item.watchedAt === 'string') {
        date = new Date(item.watchedAt);
      } else if (item.watchedAt && typeof item.watchedAt.toDate === 'function') {
        date = item.watchedAt.toDate(); // Handle old Timestamp objects
      } else if (item.watchedAt instanceof Date) {
        date = item.watchedAt;
      } else {
        date = new Date(item.watchedAt);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return; // Skip invalid dates
      }
      
      const diffInMs = now - date;
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);
      
      let groupKey;
      if (diffInHours < 24) {
        groupKey = 'Today';
      } else if (diffInDays < 7) {
        groupKey = 'This Week';
      } else if (diffInDays < 30) {
        groupKey = 'This Month';
      } else {
        groupKey = 'Older';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    });
    
    return groups;
  };

  const groupedHistory = groupByDate(filteredHistory);

  return (
    <div className="history-page">
      <Navbar 
        activeItem={activeItem} 
        onItemChange={handleItemClick} 
        isSidebarCollapsed={isSidebarCollapsed} 
        setIsSidebarCollapsed={setIsSidebarCollapsed} 
      />
      
      {/* Header Section */}
      <div className="history-header">
        <div className="header-left">
          <h1>History</h1>
        </div>
        <div className="header-right">
          <button className="clear-history-btn" onClick={handleClearHistory}>
            <FaTrash />
            Clear All History
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="history-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-section">
          <FaFilter className="filter-icon" />
          <select 
            value={selectedFilter} 
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All History</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner">Loading watch history...</div>
        </div>
      )}

      {/* Empty State */}
      {!loading && watchHistory.length === 0 && (
        <div className="empty-state">
          <FaHistory className="empty-icon" />
          <h3>No watch history</h3>
          <p>Start watching videos to see your history here</p>
          <button className="browse-videos-btn" onClick={() => navigate('/home')}>
            Browse Videos
          </button>
        </div>
      )}

      {/* History Content */}
      {!loading && watchHistory.length > 0 && (
        <>
          {selectedItems.size > 0 && (
            <div className="selection-indicator" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{selectedItems.size} video{selectedItems.size > 1 ? 's' : ''} selected</span>
              <button className="delete-selected-btn" onClick={handleDeleteSelected}>
                <FaTrash />
                Delete History
              </button>
            </div>
          )}
          <div className="history-content">
            {/* Shorts Section */}
            {(() => {
              const shortsItems = filteredHistory.filter(item => 
                item.type === 'short' || item.thumbnailUrl?.includes('shorts')
              );
              if (shortsItems.length === 0) return null;
              
              const groupedShorts = groupByDate(shortsItems);
              return (
                <div className="content-type-section">
                  <div className="type-header">
                    <FaFilm className="type-icon short" />
                    <h2 className="type-title">Shorts</h2>
                    <span className="type-count">({shortsItems.length} shorts)</span>
                  </div>
                  {Object.entries(groupedShorts).map(([dateGroup, items]) => (
                    <div key={`short-${dateGroup}`} className="history-group">
                      <div className="date-header">
                        <FaCalendarAlt className="date-icon" />
                        <span className="date-text">{dateGroup}</span>
                      </div>
                      <div className="history-items shorts-view">
                        {items.map(item => (
                          <div 
                            key={item.videoId} 
                            className={`history-item ${selectedItems.has(item) ? 'selected' : ''}`}
                            onClick={() => handleSelectItem(item)}
                          >
                            <div className="item-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedItems.has(item)}
                                onChange={() => handleSelectItem(item)}
                              />
                            </div>
                            <div className="item-thumbnail" onClick={() => navigate(getNavigationRoute(item))}>
                              {item.type === 'short' || item.thumbnailUrl?.includes('shorts') ? (
                                <video
                                  className="shorts-preview-video"
                                  src={getThumbnailUrl(item)}
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                />
                              ) : (
                                <img src={getThumbnailUrl(item)} alt={item.title} />
                              )}
                              <div className="thumbnail-overlay">
                                <FaPlay className="play-icon" />
                                <span className="duration">{formatDuration(item.duration)}</span>
                              </div>
                              <div className="watched-progress" style={{ width: item.watchProgress || '0%' }}></div>
                              <div className={`thumbnail-badge ${item.type === 'short' || item.thumbnailUrl?.includes('shorts') ? 'short' : 'video'}`}>
                                {(() => {
                                  const Icon = getTypeIcon(item);
                                  return (
                                    <>
                                      <Icon className="badge-icon" />
                                      <span>{getTypeLabel(item)}</span>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                            <div className="item-info">
                              <h3 className="item-title">{item.title}</h3>
                              <div className="item-details">
                                <span className="channel-name">{item.authorName || 'Unknown'}</span>
                                <span className="item-views">{formatViews(item.views)} views</span>
                                <span className="item-timestamp">{formatDate(item.watchedAt)}</span>
                              </div>
                              <div className="item-actions">
                                <button className="action-btn" title="More options">
                                  <FaEllipsisH />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Videos Section */}
            {(() => {
              const videoItems = filteredHistory.filter(item => 
                (!item.type || item.type === 'video') && 
                (!item.thumbnailUrl?.includes('shorts'))
              );
              if (videoItems.length === 0) return null;
              
              const groupedVideos = groupByDate(videoItems);
              return (
                <div className="content-type-section">
                  <div className="type-header">
                    <FaPlay className="type-icon video" />
                    <h2 className="type-title">Videos</h2>
                    <span className="type-count">({videoItems.length} videos)</span>
                  </div>
                  {Object.entries(groupedVideos).map(([dateGroup, items]) => (
                    <div key={`video-${dateGroup}`} className="history-group">
                      <div className="date-header">
                        <FaCalendarAlt className="date-icon" />
                        <span className="date-text">{dateGroup}</span>
                      </div>
                      <div className="history-items">
                        {items.map(item => (
                          <div 
                            key={item.videoId} 
                            className={`history-item ${selectedItems.has(item) ? 'selected' : ''}`}
                            onClick={() => handleSelectItem(item)}
                          >
                            <div className="item-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedItems.has(item)}
                                onChange={() => handleSelectItem(item)}
                              />
                            </div>
                            <div className="item-thumbnail" onClick={() => navigate(getNavigationRoute(item))}>
                              <img src={getThumbnailUrl(item)} alt={item.title} />
                              <div className="thumbnail-overlay">
                                <FaPlay className="play-icon" />
                                <span className="duration">{formatDuration(item.duration)}</span>
                              </div>
                              <div className="watched-progress" style={{ width: item.watchProgress || '0%' }}></div>
                              <div className="thumbnail-badge video">
                                {(() => {
                                  const Icon = getTypeIcon(item);
                                  return (
                                    <>
                                      <Icon className="badge-icon" />
                                      <span>{getTypeLabel(item)}</span>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                            <div className="item-info">
                              <h3 className="item-title">{item.title}</h3>
                              <div className="item-details">
                                <span className="channel-name">{item.authorName || 'Unknown'}</span>
                                <span className="item-views">{formatViews(item.views)} views</span>
                                <span className="item-timestamp">{formatDate(item.watchedAt)}</span>
                              </div>
                              <div className="item-actions">
                                <button className="action-btn" title="More options">
                                  <FaEllipsisH />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </>
      )}

      {/* Load More */}
      {!loading && watchHistory.length > 0 && (
        <div className="load-more-section">
          <button className="load-more-btn">Load More</button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
