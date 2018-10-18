import guid from '../guid';

describe('guid', () => {
  it('should return a string', () => {
    const id = guid();
    expect(typeof id).toBe('string');
  });
  it('should not be generated two equal guids', () => {
    const id1 = guid();
    const id2 = guid();
    expect(id1).not.toEqual(id2);
  });
});
