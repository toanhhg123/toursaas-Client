export interface ITour {
  _id: string
  route: string
  duration: string
  name: string
  transport: string
  goDate: Date
  goFlight: string
  returnDate: Date
  returnFlight: string
  visaDate: Date
  hotelClass: number
  programLink: string
  commision: number
  status: string
  isDeleted: boolean
  tourMan: IUserInTour
  tourGuide: IUserInTour
  operator: {
    _id: string
    name: string
    email: string
    phone: string
    address?: string
  }
}

export type TourCreate = Omit<ITour, '_id' | 'isDeleted'>

const initUser: IUserInTour = {
  _id: '',
  email: 'tourMan@gmail.com',
  name: '',
  phone: '',
}

export const initTourCreate: TourCreate = {
  route: '',
  duration: '',
  name: '',
  transport: '',
  goFlight: '',
  returnFlight: '',
  hotelClass: 0,
  programLink: '',
  commision: 0,
  status: '',
  tourMan: initUser,
  tourGuide: initUser,
  operator: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: undefined,
  },
  goDate: new Date(),
  returnDate: new Date(),
  visaDate: new Date(),
}

export interface IUserInTour {
  _id: string
  name: string
  email: string
  phone: string
  address?: string
}

export const initTour: ITour = {
  _id: '01',
  route: 'HCM VN JAPAN',
  duration: '4 ngay 1 Dem',
  name: 'Tour Du Lich Viet Nam',
  transport: 'Máy bay 42 chỗ',
  goDate: new Date(),
  goFlight: 'Eline 45987',
  returnDate: new Date(),
  returnFlight: 'Eline 8123',
  visaDate: new Date(),
  hotelClass: 5,
  programLink: '',
  commision: 0,
  status: '',
  isDeleted: false,
  tourMan: initUser,
  tourGuide: initUser,
  operator: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: undefined,
  },
}
