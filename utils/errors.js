module.exports = {
  BAD_REQUEST: 400,        // Cerere invalidă (ex: date lipsă, format greșit)
  UNAUTHORIZED: 401,       // Autentificare eșuată (folosit în login)
  FORBIDDEN: 403,          // Acces interzis (de obicei pentru autorizare)
  NOT_FOUND: 404,          // Resursa nu a fost găsită
  CONFLICT: 409,           // Conflict (ex: email deja folosit)
  SERVER_ERROR: 500        // Eroare internă de server
};