import { Link } from "gatsby"
import * as React from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import colors from "../utils/colors"
import { logoPath, backArrowPoints } from "../utils/path"

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`

const fading = keyframes`
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
  },
  to {
    opacity: 1;
  }
`

const Path = styled.path`
  stroke: ${colors.shakespeare};
  stroke-dashoffset: 0;
  stroke-dasharray: 0;
  stroke-width: 2;
  fill: none;
`

const Polygon = styled.polygon`
  stroke: ${colors.shakespeare};
  stroke-width: 2;
  fill: none;
  &:nth-child(2) {
    transform: translateX(17px);
  }
  &:nth-child(3) {
    transform: translateX(34px);
  }
`

const SVG = styled.svg`
  display: block;
  width: 62px;
  height: 38px;
  &:hover path {
    stroke-dashoffset: 200;
    stroke-dasharray: 200;
    animation: ${dash} 1s linear forwards;
  }
  &:hover polygon:nth-child(1) {
    animation: ${fading} 0.7s ease-in-out 0.2s forwards;
  }
  &:hover polygon:nth-child(2) {
    animation: ${fading} 0.7s ease-in-out 0.1s forwards;
  }
  &:hover polygon:nth-child(3) {
    animation: ${fading} 0.7s ease-in-out forwards;
  }
`

const A = styled(Link)`
  display: flex;
  align-items: center;
`

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  &:hover input {
    left: 0;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  padding: 0.25rem 1rem;
  color: ${colors.mountainMeadow};
  border-bottom: 1px solid ${colors.mountainMeadow};
  height: 100%;
  position: relative;
  left: 100%;
  transition: left 0.8s ease-in-out;
`

const Icon = styled("span")`
  color: ${colors.mountainMeadow};
  z-index: 1;
  background-color: white;
  position: absolute;
  right: 0;
`

interface HeaderProps {
  pathname: string
}

const Header = ({ pathname }: HeaderProps) => (
  <header>
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <A to="/">
        <SVG viewBox="-2 0 63 38">
          {pathname === "/" ? (
            <Path d={logoPath} />
          ) : (
            <g>
              <Polygon points={backArrowPoints} />
              <Polygon points={backArrowPoints} />
              <Polygon points={backArrowPoints} />
            </g>
          )}
        </SVG>
      </A>
      {/* {pathname === '/' && (
            <Searchbar>
                <Input
                    type="text"
                    placeholder="Type title..."
                    value={searchtext}
                    onChange={this.handleOnChange}
                />
                <Icon />
            </Searchbar>
        )} */}
    </div>
  </header>
)

Header.propTypes = {}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
