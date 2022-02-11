import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';

function aboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About This Project</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere omnis
          porro fuga vitae ipsa in!
        </p>
        <p>version: 1.0.0</p>

        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default aboutPage;
