// take only needed user fields to avoid sensitive ones (such as password)
// TODO any
export function extractUser(req: any) {
  if (!req.user) return null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, username } = req.user;
  return {
    _id,
    username,
  };
}
