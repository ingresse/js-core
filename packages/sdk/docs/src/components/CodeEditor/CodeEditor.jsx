/**
 * Core Packages
 */
import React, { useState } from 'react';

/**
 * Composition Components
 */
import {
    Col,
    Row,
    CodeExample,
} from '../';

/**
 * Component Styles
 */
import {
    className,
    CodeEditorStyled,
} from './styles';

/**
 * Component Itself
 */
function CodeEditor({
    title    = '@ingresse/sdk',
    children = '',
    files    = [],
    className: cn,
}) {
    /**
     * Local values
     */
    const [ tab, setTab ] = useState(files[0] ? files[0].name : '');

    /**
     * Toggle active tab
     *
     * @param {string} newTab
     */
    function toggleTab(newTab = '') {
        setTab(newTab);
    }

    /**
     * Render
     */
    return (
        <CodeEditorStyled
            className={`${className} ${cn}`}>
            <div className={className.concat('__header')}>
                <Row horizontal="center">
                    <Col
                        xs={3}
                        styles={{
                            lineHeight: 0,
                        }}>
                        <span className={className.concat('__header__btn')} />
                        <span className={className.concat('__header__btn')} />
                        <span className={className.concat('__header__btn')} />
                    </Col>
                    <Col xs={6}>
                        <div className={className.concat('__header__title')}>
                            {!tab ? '' : (tab || '').concat(' — ')}{title}
                        </div>
                    </Col>
                    <Col xs={3} />
                </Row>
            </div>
            {files.map((file, index) => (
                <button
                    type="button"
                    key={className.concat('-', index)}
                    onClick={() => toggleTab(file.name)}
                    className={`${className.concat('__tab')}${(tab !== file.name) ? '' : ' active'}`}>
                    {file.name}
                </button>
            ))}
            {files.map((file, index) => (tab !== file.name) ? (null) : (
                <div
                    key={className.concat('-', index)}
                    className={className.concat('__file')}>
                    <div className={className.concat('__file__content')}>
                        <CodeExample>
                            {file.content}
                        </CodeExample>
                    </div>
                </div>
            ))}
            {(!children) ? (null) : (
                <div className={className.concat('__file')}>
                    <CodeExample>
                        {children}
                    </CodeExample>
                </div>
            )}
        </CodeEditorStyled>
    );
}

/**
 * Exporting
 */
export { CodeEditor };
