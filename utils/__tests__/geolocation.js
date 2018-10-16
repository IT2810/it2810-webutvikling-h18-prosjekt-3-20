import { getLocationOrNull } from '../geolocation';

describe('getLocationOrNull', () => {
  it('should return null on error', async () => {
    const location = await getLocationOrNull();

    expect(location).toBe(null);
  });
});
