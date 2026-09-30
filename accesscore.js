const ACCESSCORE_VERSION = '0.1.0';

function normalizeDecisionRequest(request) {
  if (!request || typeof request !== 'object') {
    throw new TypeError('authorization request must be an object');
  }

  const { subject, action, resource, context = {} } = request;

  if (subject == null || subject === '') {
    throw new Error('authorization request requires subject');
  }
  if (typeof action !== 'string' || !action.trim()) {
    throw new Error('authorization request requires action');
  }
  if (resource == null || resource === '') {
    throw new Error('authorization request requires resource');
  }
  if (!context || typeof context !== 'object' || Array.isArray(context)) {
    throw new Error('authorization request context must be an object');
  }

  return { subject, action, resource, context };
}

export { ACCESSCORE_VERSION, normalizeDecisionRequest };
