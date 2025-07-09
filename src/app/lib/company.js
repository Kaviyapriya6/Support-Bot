// src/lib/companies.js
let companies = [];

export const addCompany = (companyData) => {
  companies.push({ id: Date.now().toString(), ...companyData });
};

export const getCompanyById = (id) => {
  return companies.find((c) => c.id === id);
};

export const updateCompany = (id, updatedData) => {
  const index = companies.findIndex((c) => c.id === id);
  if (index !== -1) {
    companies[index] = { ...companies[index], ...updatedData };
  }
};

export const getAllCompanies = () => {
  return companies;
};
