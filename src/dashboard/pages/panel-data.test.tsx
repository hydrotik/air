import { loadInto } from './panel-data';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('loadInto', () => {
  it('applies the resolved value', async () => {
    const apply = jest.fn();
    loadInto(Promise.resolve([1, 2]), apply);
    await flush();
    expect(apply).toHaveBeenCalledWith([1, 2]);
  });

  it('drops a response for a session that is no longer shown', async () => {
    const apply = jest.fn();
    let shown = 'a';
    const sessionId = 'a';
    let resolve!: (rows: number[]) => void;
    loadInto(
      new Promise<number[]>((r) => {
        resolve = r;
      }),
      apply,
      () => shown === sessionId
    );
    shown = 'b';
    resolve([1]);
    await flush();
    expect(apply).not.toHaveBeenCalled();
  });

  it('logs a rejection instead of leaving it unhandled', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const failure = new Error('boom');
    loadInto(Promise.reject(failure), jest.fn());
    await flush();
    expect(error).toHaveBeenCalledWith('[AIr] Dashboard fetch failed', failure);
    error.mockRestore();
  });

  it('logs an error thrown by the setter', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    loadInto(Promise.resolve(1), () => {
      throw new Error('setter');
    });
    await flush();
    expect(error).toHaveBeenCalledTimes(1);
    error.mockRestore();
  });
});
