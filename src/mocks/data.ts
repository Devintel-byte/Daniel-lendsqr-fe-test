import type { User, UserStatus } from "@/types/user";

const organizations = ["Lendsqr", "Irorun", "Lendstar"];
const statuses: UserStatus[] = ["Active", "Inactive", "Pending", "Blacklisted"];
const genders = ["Male", "Female"] as const;
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const educationLevels = ["B.Sc", "M.Sc", "PhD", "HND", "OND"];
const employmentStatuses = ["Employed", "Self-employed", "Unemployed"];
const sectors = ["FinTech", "Technology", "Healthcare", "Education", "Retail"];
const residenceTypes = [
  "Parent's Apartment",
  "Own Apartment",
  "Rented Apartment",
];

const firstNames = [
  "Grace",
  "Tosin",
  "Debby",
  "Emmanuel",
  "Chioma",
  "Tunde",
  "Bola",
  "Kemi",
  "Ayo",
  "Seun",
];
const lastNames = [
  "Effiom",
  "Dokunmu",
  "Ogana",
  "Adebayo",
  "Okafor",
  "Williams",
  "Johnson",
  "Bello",
];

function generatePhoneNumber(): string {
  return `0${Math.floor(7000000000 + Math.random() * 2999999999)}`;
}

function generateEmail(name: string): string {
  return `${name.toLowerCase().replace(" ", ".")}@${
    ["gmail.com", "lendsqr.com", "irorun.com"][Math.floor(Math.random() * 3)]
  }`;
}

function generateUsername(name: string): string {
  return name.toLowerCase().replace(" ", "") + Math.floor(Math.random() * 100);
}

function generateAccountNumber(): string {
  return `99${Math.floor(10000000 + Math.random() * 89999999)}`;
}

function generateBVN(): string {
  return `0${Math.floor(7000000000 + Math.random() * 2999999999)}`;
}

function generateSocialHandle(name: string, platform: string): string {
  const prefix = platform === "twitter" ? "@" : "@";
  return `${prefix}${name.toLowerCase().replace(" ", "_")}`;
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString();
}

function randomElement<T>(array: ReadonlyArray<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockUser(id: number): User {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const email = generateEmail(fullName);
  const username = generateUsername(fullName);

  return {
    id: `user_${id}`,
    organization: randomElement(organizations),
    username,
    email,
    phoneNumber: generatePhoneNumber(),
    dateJoined: randomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
    status: randomElement(statuses),

    fullName,
    bvn: generateBVN(),
    gender: randomElement(genders),
    maritalStatus: randomElement(maritalStatuses),
    children: randomElement(["None", "1", "2", "3", "4+"]),
    typeOfResidence: randomElement(residenceTypes),

    levelOfEducation: randomElement(educationLevels),
    employmentStatus: randomElement(employmentStatuses),
    sectorOfEmployment: randomElement(sectors),
    durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
    officeEmail: `${username}@lendsqr.com`,
    monthlyIncome: `₦${(Math.floor(Math.random() * 400) + 100) * 1000}.00- ₦${
      (Math.floor(Math.random() * 400) + 500) * 1000
    }.00`,
    loanRepayment: `${Math.floor(Math.random() * 100) + 10},000`,

    twitter: generateSocialHandle(fullName, "twitter"),
    facebook: fullName,
    instagram: generateSocialHandle(fullName, "instagram"),

    guarantors: Array.from({ length: 2 }, () => {
      const guarantorName = `${randomElement(firstNames)} ${randomElement(
        lastNames
      )}`;
      return {
        fullName: guarantorName,
        phoneNumber: generatePhoneNumber(),
        emailAddress: generateEmail(guarantorName),
        relationship: randomElement([
          "Sister",
          "Brother",
          "Friend",
          "Cousin",
          "Parent",
        ]),
      };
    }),

    accountBalance: `₦${(Math.floor(Math.random() * 500) + 50) * 1000}.00`,
    accountNumber: generateAccountNumber(),
    bankName: randomElement([
      "Providus Bank",
      "GTBank",
      "Access Bank",
      "First Bank",
      "Zenith Bank",
    ]),

    tier: Math.floor(Math.random() * 3) + 1,
  };
}

export function generateMockUsers(count: number = 100): User[] {
  return Array.from({ length: count }, (_, i) => generateMockUser(i + 1));
}
