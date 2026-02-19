// src/services/dniService.js

const GRAPHQL_URL = 'https://graphperu.daustinn.com/api/graphql';

/**

 * @param {string} dni 
 * @returns {Promise<Object|null>}
 */
export const fetchDniData = async (dni) => {
  if (!dni || dni.length !== 8) return null;

  const query = `
    query {
      person(match: "${dni}") {
        names
        paternalLastName
        maternalLastName
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    if (!response.ok) throw new Error('Error en la respuesta de la red');

    const result = await response.json();
    return result.data?.person || null;
    
  } catch (error) {
    console.error("Error en dniService:", error);
    throw error;
  }
};