// src/services/copy.ts

/**
 * Representa un trader seguido y su rendimiento
 */
export interface FollowedTrader {
  /**
   * Identificador único del trader en el sistema
   */
  id: string;
  /**
   * Dirección de wallet asociada al trader
   */
  walletAddress: string;
  /**
   * Rendimiento porcentual reciente del trader
   */
  performance: number;
}

/**
 * Obtiene la lista de traders que un usuario sigue
 */
export async function getFollowedTraders(): Promise<FollowedTrader[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/copy/followed`);
  if (!response.ok) throw new Error('Error cargando traders seguidos');
  return response.json();
}

/**
 * Envía orden de copia de un trader seguido
 */
export async function copyTrade(traderId: string, amount: number): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/copy/trade`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ traderId, amount }),
    }
  );
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al copiar trade: ${error}`);
  }
}
