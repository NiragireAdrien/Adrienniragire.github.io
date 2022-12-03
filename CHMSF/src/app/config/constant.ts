const ROLES = {
  USER: 'User',
  ADMIN: 'Admin'
};

const ERROR_MESSAGES = {
  email: 'Please enter a valid email address',
  required: 'This field is required.',
  min: 'value too small',
  max: 'value too large',
  minlength: 'Value is too short',
  maxlength: 'Value is too big',
  passwordNotMatch: 'Password does not match',
  invalidPassword: 'Invalid Password'
};

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const HOSPITAL_SERVICES = [
  {label: 'Consultation', value: 'CONSULTATION'},
  {label: 'Radiology', value: 'RADIOLOGY'},
  {label: 'Orthopedic', value: 'ORTHOPEDIC'},
  {label: 'Dermatology', value: 'DERMATOLOGY'},
  {label: 'Dental', value: 'DENTAL'},
];

enum APPOINTMENT_STATUS {
  pending = 'PENDING',
  accepted = 'ACCEPTED',
  rejected = 'REJECTED',
}

export {
  ROLES,
  ERROR_MESSAGES,
  MONTHS,
  HOSPITAL_SERVICES,
  APPOINTMENT_STATUS
};
