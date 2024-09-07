import React, { useEffect, useState } from 'react';

interface Webhook {
  id: number;
  data: any; // Ajusta el tipo según la estructura de tus datos
}

const Portal = () => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        const response = await fetch('/api/kobo-webhook');
        if (!response.ok) {
          throw new Error('Error fetching webhooks');
        }
        const data = await response.json();
        setWebhooks(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWebhooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Webhooks</h1>
      <ul>
        {webhooks.map((webhook) => (
          <li key={webhook.id}>
            <pre>{JSON.stringify(webhook.data, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portal;