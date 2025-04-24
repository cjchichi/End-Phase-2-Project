import React from 'react';

const EditBlog = () => {
    return (
      <div className="edit-blog">
        <h2>Edit Blog</h2>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" defaultValue="Current Title" required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea defaultValue="Current content..." required></textarea>
          </div>
          <button type="submit">Update Blog</button>
        </form>
      </div>
    );
  };
  
  export default EditBlog;