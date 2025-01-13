import { ReactNode } from 'react';
import Search from '../common/Search';

const MedicineHeader = ({ children, pathName } : { children: ReactNode, pathName: string}) => {

  const segments = (pathName).split('/');
  let currentTitle: string = '';
  
  switch (segments[1]) {
    case 'medicines':
      currentTitle = `상비약 리스트`;
      break;

    case 'community':
      currentTitle = `커뮤니티`;
      break;
    
    case 'supplements':
      currentTitle = `해외 인기 영양제`;
      break;

    case 'mypage':
      currentTitle = `마이페이지`;
      break;

    case '':
      break;

  }

  return (
    <>
      {currentTitle !== '' ? (
      <div className={`${pathName === '/map' ? 'white' : `bg-background`} flex flex-col`}>
        {children}
        <div className={`pl-[260px] pr-[260px] flex gap-5 whitespace-nowrap flex-col`}>  
          <div className={`flex items-center gap-5 ${segments[1] !== 'medicines' && `mb-9`}`}>
            <h1 className={`text-display1-b text-gray-600 flex`}>{currentTitle}</h1>
            {segments[1] === `mypage` || segments[1] === `medicines` ? 
            (<p className={`text-body2-r text-gray-300`}>본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, 제공되는 정보는 의료 전문가의 조언을 대체 하지 않습니다.</p>) : 
            (<Search/>)}
          </div>
          {segments[1] === 'medicines' && 
            <div className={`mb-9`}>
              <Search/>
            </div>
          }
        </div>
      </div>
      ) : (
        <>
          {children}
        </>
      )}
    </>
  )
}

export default MedicineHeader;