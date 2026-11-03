import React from 'react';
import { Surface } from 'onepage-kit';
import Button from '@siteui/button';
import StatusLed from '@siteui/status-led';
import styles from './styles.module.css';

export default function Header(props: any) {
    const { brand, brandHref, homeLabel, host, links, ctaText, ctaLink, bg, fullHeight } = props;
    return (
        <Surface as="header" bg={ bg } className={ styles.header + (fullHeight ? ' ' + styles.full : '') + ' op-colors' }>
            <div className={ styles.inner }>
                <a href={ brandHref } target="_top" className={ styles.brand }>{ brand }</a>
                <a href={ brandHref } target="_top" className={ styles.link }>{ homeLabel }</a>
                <span className={ styles.host }><StatusLed status="done" label={ host } /></span>
                <nav className={ styles.nav }>
                    { (links || []).map((l: any, i: number) => <a key={ i } href={ l.href } className={ styles.link }>{ l.label }</a>) }
                </nav>
                <Button href={ ctaLink } target="_blank" variant="ghost">{ ctaText }</Button>
            </div>
        </Surface>
    );
}
