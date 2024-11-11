import React, { useEffect, useState } from 'react';
import ApiService from '../../context/ApiService.jsx';
import './AboutPage.css';
import Teambild from "./Teambild.jpg";

function TeamSection() {
  const [header, setHeader] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const keys = [
          'team_section_header',
          'team_member_1',
          'team_member_2',
          'team_member_3',
          'team_member_4'
        ];
        const responses = await ApiService.getTextContentsByKeys(keys);
        const contentMap = {};
        responses.forEach(response => {
          contentMap[response.data.key] = response.data.content;
        });

        setHeader(contentMap['team_section_header']);
        const formattedTeamMembers = keys
            .filter(key => key !== 'team_section_header')
            .map(key => JSON.parse(contentMap[key]));

        setTeamMembers(formattedTeamMembers);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Team-Daten:', err);
        setError('Es gab ein Problem beim Laden der Team-Daten.');
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <section className="team-section">
        <h2>{header}</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <h3>{member.name}</h3>
                <p>{member.title}</p>
                <p>{member.description}</p>
              </div>
          ))}
          <div className='team-img'>
            <img src={Teambild} alt="Team Bild" />
          </div>
        </div>
      </section>
  );
}

export default TeamSection;
