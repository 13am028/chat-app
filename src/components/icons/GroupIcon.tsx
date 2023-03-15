import React, {useEffect, useRef, useState} from 'react';
import styles from './icons.module.css';

const GroupIcon = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const menuRef = useRef(null);

    const handleContextMenu = (event: any) => {
        event.preventDefault();
        setShowMenu(true);
        setMenuPosition({x: event.clientX, y: event.clientY});
    };

    const handleClick = (event: any) => {
        // @ts-ignore
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className={styles.groupIcon} onContextMenu={handleContextMenu}>
            {showMenu && (
                <div className={styles.customContextMenu} ref={menuRef}
                     style={{top: menuPosition.y, left: menuPosition.x}}>
                    <div className={styles.menuOption}>Invite people</div>
                    <div className={styles.menuOption}>Leave server</div>
                </div>
            )}
        </div>
    );
};

export default GroupIcon;