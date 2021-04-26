import Link from 'next/link'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdCheckCircle, MdChevronRight, MdMail } from 'react-icons/md'

const applications = [
  {
    applicant: {
      name: 'Dann Coly',
      email: 'dancoly@gmail.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'Enero 7 de 2021',
    stage: 'Es parte del estudio',
    href: '#',
  },
  {
    applicant: {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Es parte del estudio',
    href: '#',
  },
  {
    applicant: {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Es parte del estudio',
    href: '#',
  },
]
const ArtistsAccountList = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-5">Artistas actuales</h2>
      <div className="bg-dark-800 shadow overflow-hidden sm:rounded-sm mb-10">
        <ul className="divide-y divide-gray-200">
          {applications.map((application) => (
            <li
              key={application.applicant.email}
              className="block hover:bg-gray-900"
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={application.applicant.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <a
                        href="#"
                        rel="noreferrer"
                        target="_blank"
                        className="text-sm font-medium text-primary truncate"
                      >
                        {application.applicant.name}
                      </a>

                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MdMail
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          {application.applicant.email}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-400">
                          Aplico en{' '}
                          <time dateTime={application.date}>
                            {application.dateFull}
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <MdCheckCircle
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                          {application.stage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <AiOutlineDelete
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ArtistsAccountList
