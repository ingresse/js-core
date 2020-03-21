/**
 * Core Packages
 */
import React, { useState } from 'react';

/**
 * Composition Components
 */
import {
    /**
     * Grid
     */
    Col,
    Row,

    /**
     * Generics
     */
    Clipboard,
    CodeExample,
} from '../';

/**
 * Component Styles
 */
import {
    className,
    CodePreviewStyled,
} from './styles';

/**
 * Component Itself
 */
function CodePreview({
    title    = '@ingresse/sdk',
    children = '',
    scope    = null,
    copy     = false,
    files    = [],
    className: cn,
}) {
    /**
     * Local values
     */
    const [ tab, setTab ]   = useState(files[0] ? files[0].name : '');
    const [ file, setFile ] = useState(tab ? files[0] : {
        content: children,
        scope  : scope,
    });

    /**
     * Toggle active tab
     *
     * @param {string} newTab
     */
    function toggleTab(newTab = '') {
        setTab(newTab);

        files.some((file) => {
            if (file.name === newTab) {
                setFile(file);

                return true;
            }

            return false;
        });
    }

    /**
     * Render
     */
    return (
        <CodePreviewStyled
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
                    <Col
                        xs={3}
                        styles={{
                            textAlign : 'right',
                            lineHeight: 0,
                        }}>
                        {(!copy) ? (null) : (
                            <Clipboard
                                styled
                                data-clipboard-text={file.content}>
                                copy
                            </Clipboard>
                        )}
                    </Col>
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
            <div
                className={className.concat('__file')}>
                <div className={className.concat('__file__content')}>
                    {(file.embed) ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: file.embed,
                            }}
                        />
                    ) : (
                        <CodeExample>
                            {file.content}
                        </CodeExample>
                    )}
                </div>
            </div>
        </CodePreviewStyled>
    );
}

/**
 * Exporting
 */
export { CodePreview };
